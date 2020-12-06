import React, {useState} from 'react';
import {View, Text} from 'react-native';
import RadioButton from 'components/common/RadioButton';
import {Button} from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';

const DocumentQuestions = (props) => {
  const [checked, setChecked] = useState(new Map());
  const [correct, setCorrect] = useState(new Map());
  const [submit, setSubmit] = useState(false);
  const [complete, setComplete] = useState(false);
  const [numComplete, setNumComplete] = useState(0);

  const check = (question, answer) => {
    setChecked(new Map(checked.set(question, answer)));
  }

  const onSubmit = () => {
    setSubmit(true);
    let complete = true;
    let numComplete = 0;
    for(let i = 0; i < props.questions.length; i++) {
      if(checked.get(i) === props.questions[i].answer) {
        setCorrect(new Map(correct.set(i, true)));
        numComplete++;
      }
      else {
        setCorrect(new Map(correct.set(i, false)));
        complete = false;
      }
    }
    if(complete) {
      setComplete(true);
      props.toggleComplete()
    }
    setNumComplete(numComplete);
  }

  return (
    <View>
      {
        submit ? 
          <View>
            <Text style={styles.text}>
              Score
            </Text>
            <Text style={styles.score}>
              You got {numComplete} of {props.questions.length} possible points 
            </Text>
            <Text style={styles.answer}>
              Your Score: {numComplete / props.questions.length * 100}%
            </Text>
            <View style={styles.line}/>
          </View>
        :
          <Text style={styles.title}>
            Test Assessment
          </Text>
      }

      {props.questions.map((question, num) => 
        <View key={num}>
          {!submit ? null : correct.get(num) ? 
            <Text style={styles.correct}>
              Correct!
            </Text>
            :
            <Text style={styles.incorrect}>
              Incorrect!
            </Text>
          }
          {complete ? 
            <View>
              <Text style={styles.bold}>
                {'Question ' + (num+1)}
              </Text>
              <Text style={styles.answer}>
                {question.question}
              </Text>
              <Text style={styles.bold}>
                Answer
              </Text>
              <Text style={styles.answer}>
                {question.choices[question.answer]}
              </Text>
            </View>
          :
            <View>
              <Text style={styles.questionText}>
                {(num+1) + '. ' + question.question}
              </Text>
            
              {question.choices.map((choice, ans) =>
                <View key={ans} style={styles.radioButton}>
                  <RadioButton
                    text={choice}
                    selected={checked.get(num) === ans}
                    onPress={() => check(num, ans)}
                  />        
                </View>      
              )}
            </View>
          }
     
        </View>
      )}
      {
        complete ?  
          <Text style={styles.completeTest}>
            The test section is complete
          </Text>
        :
          <Button
            style={styles.button}
            mode="contained"
            onPress={onSubmit}
          >
            Submit Test
          </Button>
      }
    
    </View>
  );
};

const styles = EStyleSheet.create({
  answer: {
    fontStyle: 'normal',
    fontSize: '1rem',
    marginBottom: 15,
    marginTop: 5,
    color: '#000000',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#000000',
  },
  button: {
    borderRadius: 5,
    color: '#2374A5',
  },
  completeTest: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#28A885',
    marginBottom: 10,
  },
  correct: {
    backgroundColor: '#28A885',
    borderRadius: 10,
    color: '#FFFFFF',
    padding: 2,
    fontSize: '1rem',
    width: '4rem',
  },  
  incorrect: {
    backgroundColor: '#E55151',
    borderRadius: 8,
    color: '#FFFFFF',
    padding: 3,
    fontSize: '1rem',
    width: '4.8rem',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: EStyleSheet.hairlineWidth,
    marginBottom: 15,
  },
  questionText: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#000000',
    marginBottom: 10,
    marginTop: 5,
  },
  score: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#000000',
  },
  text: {
    fontStyle: 'normal',
    fontSize: '1rem',
    marginBottom: 15,
    marginTop: 15,
    color: '#000000',
  },
  title: {
    fontStyle: 'normal',
    fontSize: '1rem',
    marginTop: 15,
    marginBottom: 10,
    color: '#000000',
  },
  radioButton: {
    marginBottom: 15,
  },
});

export default DocumentQuestions;
