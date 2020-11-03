# Installation 

Inside a directory, clone the following repositories using the following commands:

`git clone ssh://git@phabricator.isafe.org:2222/source/myokm.git myok-mobile`

`git clone ssh://git@phabricator.isafe.org:2222/source/myokmc.git myok-component`

## In myok-mobile directory

Install dependencies using `yarn install` or `npm install`.

CD into `ios/` directory and run `pod install`. After that, go back to root directoy.

Run iOS simulator using `yarn run ios`, `npm run ios`, or `react-native run-ios`. There an optional
`--simulator` argument which tell React Native which simulator to use.



## Misc

### List of all Material Icons
https://oblador.github.io/react-native-vector-icons/

### Write tests in Redux
https://redux.js.org/recipes/writing-tests
