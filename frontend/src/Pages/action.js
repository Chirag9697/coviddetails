import React, { useState } from "react";
import {
  Box,
  Button,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  StepDescription,
  Stepper,
  useSteps,
  Center,
  Flex,
} from "@chakra-ui/react";
import Form from "./Form";
import FormB from "./FormB";
import FormC from "./FormC";

const steps = [
  { title: "First", description: "Your Details" },
  { title: "Second", description: "Family Details" },
  { title: "Third", description: "Health Status" },
];

const SetAction = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    // Check if there are more steps before incrementing
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepA />;
      case 1:
        return <StepB />;
      case 2:
        return <StepC />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
      <Flex paddingLeft={9}>
        {currentStep < steps.length - 1 && (
          <Button colorScheme="blue" onClick={handleNext}>
            Next
          </Button>
        )}
      </Flex>
    </div>
  );
};

function StepA() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  return (
    <Box>
      <Stepper size="lg" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Form />
    </Box>
  );
}

function StepB() {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  return (
    <Box>
      <Stepper size="lg" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <FormB />
    </Box>
  );
}

function StepC() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  return (
    <Box>
      <Stepper size="lg" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <FormC />
    </Box>
  );
}

export default SetAction;
