import React, { Component } from 'react';
import Menu from './Menu'
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import DishDetail from './Dishdetail'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { actions } from 'react-redux-form';

import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, teste, teste2, teste3 } from '../redux/ActionCreators';
import DishDetails from './Dishdetail';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }
  const mapDispatchToProps = dispatch => {
      return{       
        resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
       // addComment: (dishId, rating, author, comment) => {dispatch( addComment(dishId, rating, author, comment)) },
        fetchDishes:   () => { dispatch(fetchDishes())},
        fetchComments: () => {dispatch(fetchComments())},
        fetchPromos:   () => {dispatch(fetchPromos())},
        fetchLeaders:  () => {dispatch(fetchLeaders())},        
        postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
      }
  }    
    
  
 class Main  extends Component {
    constructor(props) {
        super(props);
        console.log(props)
       
               
    };
    
    componentDidMount() {
        this.props.fetchDishes();
        //this.props.addComment();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders(); 
       

       
      }
    render() { 
        const HomePage = () => {
            return(
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leaderLoading={this.props.leaders.isLoading}
                    leaderErrMess={this.props.leaders.errMess}
                    />
            );
        };
        const DishWithId = ({match}) => {
            return(
                <DishDetails
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrMess={this.props.comments.errMess}
                    //addComment={this.props.addComment}
                    postComment={this.props.postComment}               
                 />
            );           
        }         

      
        return(
            <div className='container'>
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route exact path='/menu' component={ () => <Menu  dishes={this.props.dishes.dishes} />} />
                    <Route  path='/menu/:dishId' component= {DishWithId} />
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route exact path='/aboutus' component={ () => <About leaders={this.props.leaders}/>} />
                    <Redirect to='/home'/>
                </Switch>              
                <Footer/>
            </div>

        );
        
    }
} 
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));