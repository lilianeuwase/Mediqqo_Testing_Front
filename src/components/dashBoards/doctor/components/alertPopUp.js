import React, { useState, useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

// Props:
// - isOpen: boolean - whether the pop-up is visible.
// - onClose: function - callback when the pop-up should close.
// - title: string - the title of the pop-up.
// - message: string - the message body.
// - autoDismissSeconds: number - auto-dismiss duration in seconds (if 0, no auto-dismiss).
// - buttonConfigs: array - an array of button configurations.
//      Each button config is an object: { label: string, onClick: function, colorScheme?: string }
// - isCentered: boolean - if the text should be centered.
const AlertPopUp = ({
  isOpen,
  onClose,
  title = "Alert",
  message = "",
  autoDismissSeconds = 0,
  buttonConfigs = [{ label: "OK", onClick: onClose, colorScheme: "blue" }],
  isCentered = true,
}) => {
  const cancelRef = useRef();
  const [progress, setProgress] = useState(0);

  // Enable auto-dismiss only if autoDismissSeconds > 0 and there's exactly one button with label "OK"
  const autoDismissEnabled =
    autoDismissSeconds > 0 &&
    buttonConfigs.length === 1 &&
    buttonConfigs[0].label.toLowerCase() === "ok";

  useEffect(() => {
    if (isOpen && autoDismissEnabled) {
      setProgress(0);
      const totalTime = autoDismissSeconds * 1000;
      const intervalTime = 100; // update every 100 ms
      const increment = (100 * intervalTime) / totalTime; // percentage increment per tick
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            clearInterval(interval);
            onClose();
            return 100;
          }
          return newProgress;
        });
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, [isOpen, autoDismissSeconds, autoDismissEnabled, onClose]);

  // Only display remaining seconds if auto-dismiss is enabled
  const remainingSeconds =
    autoDismissEnabled
      ? Math.ceil(autoDismissSeconds - (progress / 100) * autoDismissSeconds)
      : 0;

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader textAlign={isCentered ? "center" : "left"} fontSize="xl" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody textAlign={isCentered ? "center" : "left"} fontSize="md">
            {message}
            {autoDismissEnabled && (
              <CircularProgress value={progress} size="50px" color="brand.500" mt={4}>
                <CircularProgressLabel fontWeight="bold">{remainingSeconds}s</CircularProgressLabel>
              </CircularProgress>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            {buttonConfigs.map((btn, index) => (
              <Button
                key={index}
                ref={index === 0 ? cancelRef : null}
                onClick={btn.onClick}
                colorScheme={btn.colorScheme || "blue"}
                ml={index > 0 ? 3 : 0}
              >
                {btn.label}
              </Button>
            ))}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertPopUp;
