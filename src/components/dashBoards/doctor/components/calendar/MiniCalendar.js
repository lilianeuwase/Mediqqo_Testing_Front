import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/css/MiniCalendar.css";
import { Box, Text, Icon, Input } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Card from "../../components/card/Card.js";

export default function MiniCalendar(props) {
  const { selectRange, onChange, ...rest } = props;
  // Store full date and time in one state
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  // When the calendar (date) changes, update the date part but keep the time
  const handleDateChange = (date) => {
    const updatedDate = new Date(date);
    updatedDate.setHours(
      selectedDateTime.getHours(),
      selectedDateTime.getMinutes(),
      selectedDateTime.getSeconds()
    );
    setSelectedDateTime(updatedDate);
    if (onChange) {
      onChange(updatedDate);
    }
  };

  // When the time input changes, update the time part of the selected date
  const handleTimeChange = (e) => {
    const timeString = e.target.value; // format "HH:mm"
    const [hours, minutes] = timeString.split(":").map(Number);
    const updatedDate = new Date(selectedDateTime);
    updatedDate.setHours(hours, minutes);
    setSelectedDateTime(updatedDate);
    if (onChange) {
      onChange(updatedDate);
    }
  };

  // Format the time as HH:mm for the time input's value
  const timeValue = `${("0" + selectedDateTime.getHours()).slice(-2)}:${(
    "0" + selectedDateTime.getMinutes()
  ).slice(-2)}`;

  return (
    <Card
      align="center"
      direction="column"
      w="100%"
      maxW="max-content"
      p="20px 15px"
      h="max-content"
      {...rest}
    >
      <Calendar
        onChange={handleDateChange}
        value={selectedDateTime}
        selectRange={selectRange}
        view={"month"}
        tileContent={<Text color="brand.500"></Text>}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />
      <Box mt="10px" w="100%">
        <Text mb="2">Select Time:</Text>
        <Input type="time" value={timeValue} onChange={handleTimeChange} />
      </Box>
    </Card>
  );
}
