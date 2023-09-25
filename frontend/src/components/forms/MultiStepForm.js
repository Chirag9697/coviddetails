import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
} from '@chakra-ui/react';
import { useSteps } from 'chakra-ui-steps';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const steps = [
  { title: 'First', description: 'Contact Info' },
  { title: 'Second', description: 'Date & Time' },
  { title: 'Third', description: 'Select Rooms' },
];

const MultiStepForm = () => {
  const [step, setStep] = useState(0); // Initialize step to 0
  const { activeStep } = useSteps({
    initialStep: step,
    steps: steps.length,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // Add other form fields here
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleFormChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step1 formData={formData} onChange={handleFormChange} />;
      case 1:
        return <Step2 formData={formData} onChange={handleFormChange} />;
      case 2:
        return <Step3 formData={formData} onChange={handleFormChange} />;
      default:
        return null;
    }
  };

  return (
    <Container maxW="xl" centerContent>
      <Heading as="h1" size="xl" mb={4}>
        Multi-Step Form
      </Heading>

      <Stepper index={activeStep}>
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

      {renderStep()}

      <Box mt={4}>
        {step > 0 && (
          <Button onClick={handlePrevStep}>Previous</Button>
        )}
        {step < 2 && (
          <Button onClick={handleNextStep}>Next</Button>
        )}
      </Box>
    </Container>
  );
};

export default MultiStepForm;
