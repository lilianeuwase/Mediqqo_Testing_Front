import { useState } from "react";
import { Button } from "@chakra-ui/react";
import AddVitals from "./hospital/diabetes/patients/components/vitals/addVital";
import AddConsult from "./hospital/diabetes/patients/components/consultation/addConsult";


function View() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Button to open Modal */}
      <Button colorScheme="purple" onClick={() => setIsModalOpen(true)}>
        Add Additional Patient Info
      </Button>

      {/* PatientAdditionalInfo Modal */}
      <AddConsult
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default View;