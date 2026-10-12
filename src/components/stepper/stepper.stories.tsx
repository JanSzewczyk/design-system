import * as React from "react";

import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { Spinner } from "~/components";
import { Button } from "../button";
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperNextTrigger,
  StepperPanel,
  StepperPrevTrigger,
  StepperTitle,
  StepperTrigger
} from "./index";

const meta = preview.meta({
  component: Stepper,
  tags: ["autodocs", "new"],
  title: "Components/Stepper"
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    // Check if all steps are rendered
    await expect(canvas.getByText("Step 1")).toBeInTheDocument();
    await expect(canvas.getByText("Step 2")).toBeInTheDocument();
    await expect(canvas.getByText("Step 3")).toBeInTheDocument();

    // Check if first step content is visible
    await expect(canvas.getByText("Step 1: Basic Information")).toBeInTheDocument();
  },
  render: () => {
    const [step, setStep] = React.useState("step1");

    return (
      <Stepper onValueChange={setStep} value={step}>
        <StepperNav>
          <StepperItem value="step1">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 1</StepperTitle>
                <StepperDescription>Basic Information</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step2">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 2</StepperTitle>
                <StepperDescription>Details</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step3">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 3</StepperTitle>
                <StepperDescription>Review</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        </StepperNav>

        <StepperPanel>
          <StepperContent value="step1">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 1: Basic Information</h3>
              <p className="mb-4 text-gray-600">Enter your basic information to get started.</p>
              <StepperNextTrigger asChild>
                <Button>Next</Button>
              </StepperNextTrigger>
            </div>
          </StepperContent>

          <StepperContent value="step2">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 2: Details</h3>
              <p className="mb-4 text-gray-600">Provide additional details about yourself.</p>
              <div className="flex gap-2">
                <StepperPrevTrigger asChild>
                  <Button>Previous</Button>
                </StepperPrevTrigger>
                <StepperNextTrigger asChild>
                  <Button>Next</Button>
                </StepperNextTrigger>
              </div>
            </div>
          </StepperContent>

          <StepperContent value="step3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 3: Review</h3>
              <p className="mb-4 text-gray-600">Review your information and submit.</p>
              <div className="flex gap-2">
                <StepperPrevTrigger asChild>
                  <Button>Previous</Button>
                </StepperPrevTrigger>
                <Button>Submit</Button>
              </div>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    );
  }
});

export const VerticalOrientation = meta.story({
  render: () => {
    const [step, setStep] = React.useState("step1");

    return (
      <Stepper onValueChange={setStep} orientation="vertical" value={step}>
        <StepperNav>
          <StepperItem value="step1">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 1</StepperTitle>
                <StepperDescription>Basic Information</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step2">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 2</StepperTitle>
                <StepperDescription>Details</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step3">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 3</StepperTitle>
                <StepperDescription>Review</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        </StepperNav>

        <StepperPanel>
          <StepperContent value="step1">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 1: Basic Information</h3>
              <p className="mb-4 text-gray-600">Enter your basic information.</p>
              <StepperNextTrigger asChild>
                <Button>Next</Button>
              </StepperNextTrigger>
            </div>
          </StepperContent>

          <StepperContent value="step2">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 2: Details</h3>
              <p className="mb-4 text-gray-600">Provide additional details.</p>
              <div className="flex gap-2">
                <StepperPrevTrigger asChild>
                  <Button>Previous</Button>
                </StepperPrevTrigger>
                <StepperNextTrigger asChild>
                  <Button>Next</Button>
                </StepperNextTrigger>
              </div>
            </div>
          </StepperContent>

          <StepperContent value="step3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 3: Review</h3>
              <p className="mb-4 text-gray-600">Review and submit.</p>
              <div className="flex gap-2">
                <StepperPrevTrigger asChild>
                  <Button>Previous</Button>
                </StepperPrevTrigger>
                <Button>Submit</Button>
              </div>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    );
  }
});

export const WithCompletedSteps = meta.story({
  render: () => {
    const [step, setStep] = React.useState("step2");

    return (
      <Stepper onValueChange={setStep} value={step}>
        <StepperNav>
          <StepperItem completed value="step1">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 1</StepperTitle>
                <StepperDescription>Completed</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step2">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 2</StepperTitle>
                <StepperDescription>In Progress</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step3">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 3</StepperTitle>
                <StepperDescription>Pending</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        </StepperNav>

        <StepperPanel>
          <StepperContent value="step1">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 1 Content</h3>
            </div>
          </StepperContent>
          <StepperContent value="step2">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 2 Content</h3>
            </div>
          </StepperContent>
          <StepperContent value="step3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 3 Content</h3>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    );
  }
});

export const WithDisabledSteps = meta.story({
  render: () => {
    const [step, setStep] = React.useState("step1");

    return (
      <Stepper onValueChange={setStep} value={step}>
        <StepperNav>
          <StepperItem value="step1">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 1</StepperTitle>
                <StepperDescription>Available</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem disabled value="step2">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 2</StepperTitle>
                <StepperDescription>Disabled</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem disabled value="step3">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 3</StepperTitle>
                <StepperDescription>Disabled</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        </StepperNav>

        <StepperPanel>
          <StepperContent value="step1">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Only Step 1 is Available</h3>
              <p className="text-gray-600">Other steps are disabled.</p>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    );
  }
});

export const WithLoadingState = meta.story({
  render: () => {
    const [step, setStep] = React.useState("step2");

    return (
      <Stepper indicators={{ loading: <Spinner /> }} onValueChange={setStep} value={step}>
        <StepperNav>
          <StepperItem completed value="step1">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 1</StepperTitle>
                <StepperDescription>Completed</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem loading value="step2">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 2</StepperTitle>
                <StepperDescription>Loading...</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step3">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 3</StepperTitle>
                <StepperDescription>Pending</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        </StepperNav>

        <StepperPanel>
          <StepperContent value="step1">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 1 Content</h3>
            </div>
          </StepperContent>
          <StepperContent value="step2">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 2 is Loading</h3>
              <p className="text-gray-600">Please wait...</p>
            </div>
          </StepperContent>
          <StepperContent value="step3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 3 Content</h3>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    );
  }
});

export const ManualActivation = meta.story({
  render: () => {
    const [step, setStep] = React.useState("step1");

    return (
      <Stepper activationMode="manual" onValueChange={setStep} value={step}>
        <StepperNav>
          <StepperItem value="step1">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 1</StepperTitle>
                <StepperDescription>Manual activation</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step2">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 2</StepperTitle>
                <StepperDescription>Press Enter/Space to activate</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step3">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 3</StepperTitle>
                <StepperDescription>Keyboard navigation</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        </StepperNav>

        <StepperPanel>
          <StepperContent value="step1">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Manual Activation Mode</h3>
              <p className="mb-4 text-gray-600">
                Navigate with arrow keys, then press Enter or Space to activate a step.
              </p>
            </div>
          </StepperContent>
          <StepperContent value="step2">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 2 Content</h3>
            </div>
          </StepperContent>
          <StepperContent value="step3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 3 Content</h3>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    );
  }
});

export const WithCustomIndicators = meta.story({
  render: () => {
    const [step, setStep] = React.useState("step1");

    return (
      <Stepper
        indicators={{
          active: <span className="text-xl">→</span>,
          completed: <span className="text-xl">✓</span>,
          inactive: <span className="text-xl">○</span>
        }}
        onValueChange={setStep}
        value={step}
      >
        <StepperNav>
          <StepperItem completed value="step1">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 1</StepperTitle>
                <StepperDescription>Custom indicators</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step2">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 2</StepperTitle>
                <StepperDescription>With custom icons</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step3">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 3</StepperTitle>
                <StepperDescription>Inactive state</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        </StepperNav>

        <StepperPanel>
          <StepperContent value="step1">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 1 Content</h3>
            </div>
          </StepperContent>
          <StepperContent value="step2">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 2 Content</h3>
            </div>
          </StepperContent>
          <StepperContent value="step3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 3 Content</h3>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    );
  }
});

export const WithValidation = meta.story({
  render: () => {
    const [step, setStep] = React.useState("step1");
    const [formValid, setFormValid] = React.useState(false);

    const handleValidate = React.useCallback(
      async (value: string, direction: string) => {
        if (value === "step2" && direction === "next") {
          return formValid;
        }
        return true;
      },
      [formValid]
    );

    return (
      <Stepper onValidate={handleValidate} onValueChange={setStep} value={step}>
        <StepperNav>
          <StepperItem value="step1">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 1</StepperTitle>
                <StepperDescription>Form with validation</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step2">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 2</StepperTitle>
                <StepperDescription>Next step</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        </StepperNav>

        <StepperPanel>
          <StepperContent value="step1">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Validation Example</h3>
              <label className="mb-4 flex items-center gap-2">
                <input checked={formValid} onChange={(e) => setFormValid(e.target.checked)} type="checkbox" />
                <span>Check this to enable next step</span>
              </label>
              <StepperNextTrigger asChild>
                <Button>Next</Button>
              </StepperNextTrigger>
            </div>
          </StepperContent>
          <StepperContent value="step2">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 2 Content</h3>
              <p className="text-gray-600">You successfully validated form!</p>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    );
  }
});

export const InteractiveNavigation = meta.story({
  play: async ({ canvas, userEvent }) => {
    // Verify initial state
    await expect(canvas.getByText("Step 1: Interactive Navigation")).toBeInTheDocument();

    // Click on Step 2
    const step2Trigger = canvas.getByText("Step 2");
    await userEvent.click(step2Trigger);

    // Verify Step 2 content is now visible
    await expect(canvas.getByText("Step 2: Interactive Navigation")).toBeInTheDocument();
  },
  render: () => {
    const [step, setStep] = React.useState("step1");

    return (
      <Stepper onValueChange={setStep} value={step}>
        <StepperNav>
          <StepperItem value="step1">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 1</StepperTitle>
                <StepperDescription>Click to navigate</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step2">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 2</StepperTitle>
                <StepperDescription>Interactive steps</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
          <StepperItem value="step3">
            <StepperTrigger>
              <StepperIndicator />
              <div>
                <StepperTitle>Step 3</StepperTitle>
                <StepperDescription>Direct navigation</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        </StepperNav>

        <StepperPanel>
          <StepperContent value="step1">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 1: Interactive Navigation</h3>
              <p className="mb-4 text-gray-600">Click on any step above to navigate directly.</p>
              <p className="mb-4 text-gray-600">Current step: {step}</p>
            </div>
          </StepperContent>
          <StepperContent value="step2">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 2: Interactive Navigation</h3>
              <p className="mb-4 text-gray-600">Click on any step above to navigate directly.</p>
              <p className="mb-4 text-gray-600">Current step: {step}</p>
            </div>
          </StepperContent>
          <StepperContent value="step3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold text-lg">Step 3: Interactive Navigation</h3>
              <p className="mb-4 text-gray-600">Click on any step above to navigate directly.</p>
              <p className="mb-4 text-gray-600">Current step: {step}</p>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    );
  }
});
