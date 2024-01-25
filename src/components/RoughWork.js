import React, { useState } from 'react';
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react'

export default function Test() {
  // State to store the selected radio value and checkboxes

    const steps = [
      { title: 'First', description: 'Contact Info' },
      { title: 'Second', description: 'Date & Time' },
      { title: 'Third', description: 'Select Rooms' },
    ]
    
    const data = [
      {id:1,
       status:'ordered'}
    ]
      const { activeStep } = useSteps({
        index: data.find((i)=> i.status == 'ordered') ? 1 : data.find((i)=> i.status == 'dispatch') ? 2 : data.find((i)=> i.status == 'delivered') ? 3 : 1 ,
        count: steps.length,
      })
    
      return (
        <Stepper index={activeStep} orientation='vertical' height='400px' gap='0'>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
  
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
  
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      )
    }
    
    // render(<Example />)
