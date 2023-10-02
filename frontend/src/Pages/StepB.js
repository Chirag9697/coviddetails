import React from "react";
import {
  Text,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
  Stack,
  StepNumber,
  Box,
  StepTitle,
  StepDescription,
} from "@chakra-ui/react";
import FormB from "./FormB";

const steps = [
  { title: "First", description: "Your Details" },
  { title: "Second", description: "Family Details" },
  { title: "Third", description: "Health Status" },
];

const StepB = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Box padding={5}>
      <Stepper size="lg" index={activeStep} >
        {steps.map((step, index) => (
          <Step key={index}>
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
};

export default StepB;