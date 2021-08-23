import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import {Card, Button} from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
  super(props) ;
  this.state = {
allDrinks: []
  }
  }
  
componentDidMount() {
  axios
  .get('http://localhost:3010/allDrinks')
  .then(result => {
    this.setState({
      allDrinks: result.data
    })
  })
  .catch(err =>{
    console.log(err)
  })
}


addDrink = (drinkObj) => {

  const {user} = this.props.auth0

  // const newDrink = {
  //   drinkName: drinkObj.strDrink,
  //   drinkImg: drinkObj.strDrinkThumb
  // }
const params = {
  userEmail: user.email,
  drinkObj: drinkObj
}

axios
.post(`http://localhost:3010/addDrink`,params)
.catch(err => {console.log(err)})


}


  render() {
    return(
   <>
   { this.state.allDrinks.length && this.state.allDrinks.map((drink,idx) => {
     return (
       <>
       <Card style={{ width: '18rem' , display: 'inline-block'  }}>
  <Card.Img variant="top" src={drink.drinkImg} />
  <Card.Body>
    <Card.Title>{drink.drinkName}</Card.Title>
    <Button onClick={() => {this.addDrink(drink)}} variant="primary">Add To Favorite</Button>
  </Card.Body>
</Card>
       </>
     )
   })

}
   </>
    )
  }
}

export default withAuth0 (MyFavoriteBooks);
