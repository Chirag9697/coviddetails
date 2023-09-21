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
} from "@chakra-ui/react";

const steps = [
  { title: "First", description: "Your Details" },
  { title: "Second", description: "Family Details" },
  { title: "Third", description: "Health Status" },
];

function StepC() {
  const { activeStep, setActiveStep } = useSteps({
    index: 2,
    count: steps.length,
  });

  const activeStepText = steps[activeStep].description;

  return (
    <Stack>
      <Stepper size="sm" index={activeStep} gap="0">
        {steps.map((step, index) => (
          <Step key={index} gap="0">
            <StepIndicator>
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
            <StepSeparator _horizontal={{ ml: "0" }} />
          </Step>
        ))}
      </Stepper>
      <Text>
        {" "}
        {activeStep + 1}: <b>{activeStepText}</b>{" "}
      </Text>
    </Stack>
  );
}

export default StepC;
