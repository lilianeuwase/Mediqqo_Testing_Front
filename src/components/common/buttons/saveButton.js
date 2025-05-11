import { Button } from "@chakra-ui/react";
import React from "react";

function SaveButton({
  onClick,
  isSaving,
  text = "Save",               // Default text
  loadingText = "Saving...",   // Default loading text
  colorScheme = "purple",       // Default color
  ...props
}) {
  return (
    <Button
      colorScheme={colorScheme}
      onClick={onClick}
      isLoading={isSaving}
      loadingText={loadingText}
      {...props}
    >
      {text}
    </Button>
  );
}

export default SaveButton;