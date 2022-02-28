import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { OrderStatus } from "src/features/orders/state/types";

const steps = ["Pending", "Processing", "Error", "Completed"];

type OrderStatusStepperProps = {
  orderStatus: OrderStatus | undefined;
};

export default function OrderStatusStepper({
  orderStatus,
}: OrderStatusStepperProps) {
  const { t } = useTranslation();

  return (
    <Stepper activeStep={orderStatus}>
      {steps.map((label) => {
        if (orderStatus === 2) {
          if (label === "Error") {
            return (
              <Step key={label}>
                <StepLabel error={true}>{t(label.toLowerCase())}</StepLabel>
              </Step>
            );
          } else if (label === "Completed") {
            return null;
          } else {
            return (
              <Step key={label}>
                <StepLabel error={false}>{t(label.toLowerCase())}</StepLabel>
              </Step>
            );
          }
        } else {
          if (label === "Error") {
            return null;
          } else {
            return (
              <Step key={label}>
                <StepLabel>{t(label.toLowerCase())}</StepLabel>
              </Step>
            );
          }
        }
      })}
    </Stepper>
  );
}
