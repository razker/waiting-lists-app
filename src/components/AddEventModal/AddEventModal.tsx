import * as React from "react";
import { Formik } from "formik";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "./AddEventModal.module.css";
import { ModalOptions } from "../Home";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { EventType } from "../../global/types";

type AddEventModalProps = {
  isOpen: boolean;
  handleClose: (reason?: any) => void;
  handleOnSubmit: (eventType: EventType, eventDate: string) => Promise<any>;
};

export default function AddEventModal({
  isOpen,
  handleClose,
  handleOnSubmit,
}: AddEventModalProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  const [errorCreatingNewEvent, setErrorCreatingNewEvent] = useState("");

  const onClose = (event: any, reason: any) => {
    setErrorCreatingNewEvent("");
    handleClose(reason);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{t("add-event.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography color={theme.palette.error.main}>
              {errorCreatingNewEvent}
            </Typography>
          </DialogContentText>

          <DialogContentText>{t("add-event.description")}</DialogContentText>

          <Formik
            initialValues={{ eventType: -1, eventDate: Date.now() }}
            validate={(values) => {
              const errors: any = {};
              if (values.eventType === -1) {
                errors.eventType = t("register.required");
              }

              if (!values.eventDate) {
                errors.eventDate = t("register.required");
              } else {
                const formatedDate = dayjs(values.eventDate).format(
                  "DD/MM/YYYY"
                );
                if (formatedDate === "Invalid Date") {
                  errors.eventDate = t("register.required");
                }
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const dateToSend = dayjs(values.eventDate)
                  .set("hour", 14)
                  .set("minute", 0)
                  .set("second", 0);
                await handleOnSubmit(values.eventType, dateToSend.format());
                setSubmitting(false);
                handleClose(ModalOptions.RegisterEvent);
              } catch (e: any) {
                setErrorCreatingNewEvent(e);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              dirty,
              setFieldValue,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <FormControl fullWidth>
                    <InputLabel>
                      {t("add-event.event-type.placeholder")}
                    </InputLabel>
                    <Select
                      autoFocus
                      labelId="eventType"
                      id="eventType"
                      name="eventType"
                      value={values.eventType}
                      label="eventType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.eventType && !!errors?.eventType}
                    >
                      <MenuItem value={-1}>
                        <em> {t("add-event.event-type.placeholder")}</em>
                      </MenuItem>
                      <MenuItem value={EventType.Depth}>
                        {t("add-event.event-type.depth")}
                      </MenuItem>
                      <MenuItem value={EventType.Pool}>
                        {t("add-event.event-type.pool")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className={styles.inputContainer}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        showToolbar
                        label={t("add-event.date-field")}
                        disableOpenPicker
                        disablePast
                        inputFormat="DD/MM/YYYY"
                        value={values.eventDate}
                        onChange={(value) =>
                          setFieldValue("eventDate", value, true)
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </div>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={() => handleClose(ModalOptions.RegisterEvent)}
                  >
                    {t("register.cancel")}
                  </Button>
                  <Button
                    variant="contained"
                    disabled={isSubmitting || !isValid || !dirty}
                    type="submit"
                    color="success"
                  >
                    {t("add-event.create")}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
