import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

const UserCard = ({ user }) => { 
    return ( 
      <>
          <Card centered items style={{marginBottom: '2rem'}}
            image={user.avatar? user.avatar : 'https://picsum.photos/200/300'}
            header={user.name}
            meta={user.email}
            description={user.bio ? user.bio : 'Bio goes here'}
          />
      </>
         );
    }

 
export default UserCard ;