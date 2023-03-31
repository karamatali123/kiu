import React, { Fragment, useState } from "react";
import { TextField } from "@material-ui/core";
import {
  MobileDatePicker,
  DesktopDatePicker,
  DatePicker,
} from "@material-ui/pickers";

function DatePickers(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <MobileDatePicker
        clearable
        label="For mobile"
        inputFormat="MM/dd/yyyy"
        toolbarPlaceholder="Enter Date"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} />}
      />

      <DesktopDatePicker
        autoOk
        label="For desktop"
        minDate={new Date("2017-01-01")}
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} />}
      />

      <DatePicker
        disableFuture
        label="Responsive"
        openTo="year"
        views={["year", "month", "date"]}
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} />}
      />
    </Fragment>
  );
}

export default DatePicker;
