import React from 'react';
import '../../App.css';
import { withRouter } from 'react-router-dom'

function Game() {
  return (
    <div>
       <h1 className='game'>ทอยทำเกม</h1>
    </div>
  )
}

export default withRouter(Game)

