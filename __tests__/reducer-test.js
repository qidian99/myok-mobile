import reducers from '../../reducers';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

test('reducers', () => {
  let state;
  state = mockStore(
    {
      auth: {user: null, token: null},
      document: {documents: []},
      child: {children: []},
      _persist: {version: -1, rehydrated: false},
    },
    {
      type: 'persist/REHYDRATE',
      payload: {
        auth: {
          user: {
            first_name: 'First',
            last_name: 'Last',
            email: 'test@isafeventures.com',
            username: 'test@isafeventures.com',
          },
          token:
            'eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0',
        },
        document: {
          documents: [
            {title: 'Mock Document', body: 'This is a mock document'},
            {title: 'Mock Document', body: 'This is a mock document'},
            {title: 'Mock Document', body: 'This is a mock document'},
          ],
        },
        child: {
          children: [
            {
              first_name: 'Child',
              last_name: 'One',
              dob: '2020-11-03T03:55:23.644Z',
            },
            {
              first_name: 'Child',
              last_name: 'One',
              dob: '2020-11-03T03:55:23.644Z',
            },
          ],
        },
        _persist: {version: -1, rehydrated: true},
      },
      key: 'root',
    },
  );
  expect(state).toEqual({
    auth: {
      user: {
        first_name: 'First',
        last_name: 'Last',
        email: 'test@isafeventures.com',
        username: 'test@isafeventures.com',
      },
      token:
        'eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0',
    },
    document: {
      documents: [
        {title: 'Mock Document', body: 'This is a mock document'},
        {title: 'Mock Document', body: 'This is a mock document'},
        {title: 'Mock Document', body: 'This is a mock document'},
      ],
    },
    child: {
      children: [
        {
          first_name: 'Child',
          last_name: 'One',
          dob: '2020-11-03T03:55:23.644Z',
        },
        {
          first_name: 'Child',
          last_name: 'One',
          dob: '2020-11-03T03:55:23.644Z',
        },
      ],
    },
    _persist: {version: -1, rehydrated: true},
  });
});
