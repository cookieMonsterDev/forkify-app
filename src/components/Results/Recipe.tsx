import React from 'react'
import styled from 'styled-components'

const Recipe = () => {
  console.log('render')

  return (
    <Container>Recipe</Container>
  )
}

export default Recipe

const Container = styled.div`
  flex: 3;
  background-color: green;
`