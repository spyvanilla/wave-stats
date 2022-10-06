# How to create a new page
- Let's suppose you want to create an "Add Friends" page
- Go to the ```src``` directory and search for the ```Pages``` directory
- There, create a new folder called ```AddFriends``` and two files, an ```add-friends.tsx``` file and an ```add-friends.css``` file inside of it
- Write the page component with the following pattern:
```Typescript
import {React} from 'react';
import {useState,useEffect} from 'react'; // this is optional, obviously, but it's just a reminder that these shouldn't be imported in the same line as React class

function AddFriends() {
  const [something,setSomething] = useState();
  
  useEffect(() => {
    ...
  })

  return (
    <></>
  )
}

export default AddFriends;
```
- After the component is created and exported, go to the ```index.ts``` file in the Pages directory and write:
```Typescript
import AddFriends from './AddFriends/add-friends';

export {...,AddFriends};
```
- Then go back to the ```src``` directory and go to the ```App.tsx``` file, there you add the route for your page:
```Typescript
import {...,AddFriends} from './Pages';
...

function App() {
  ...
    <Route path="/add-friends" element={<AddFriends />}></Route>
}
```
- After that, go to the ```app.py``` file in the root directory, there you need to add the new ```add-friends``` route:
```Python
@app.route('/add-friends')
```
