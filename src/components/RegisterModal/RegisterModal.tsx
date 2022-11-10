import * as React from "react";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { Box, Typography, useTheme } from "@mui/material";
import styles from "./RegisterModal.module.css";
import { ModalOptions } from "../Home";
import { useState } from "react";

type RegisterModalProps = {
  isOpen: boolean;
  handleClose: (modalOption: ModalOptions, reason?: any) => void;
  eventData?: {
    eventId?: string;
    eventTitle?: string;
  };
  handleOnSubmit: (
    fullName: string,
    phoneNumber: string,
    eventId: string
  ) => Promise<unknown>;
};

export default function RegisterModal({
  isOpen,
  handleClose,
  eventData,
  handleOnSubmit,
}: RegisterModalProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  const [errorRegestration, setErrorRegestration] = useState("");

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={(event, reason) => {
          handleClose(ModalOptions.RegisterEvent, reason);
          setErrorRegestration("");
        }}
      >
        <DialogTitle>{eventData?.eventTitle}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Typography color={theme.palette.error.main}>
              {errorRegestration}
            </Typography>
          </DialogContentText>
          <DialogContentText>{t("register.description")}</DialogContentText>

          <Formik
            initialValues={{ fullName: "", phoneNumber: "" }}
            validate={(values) => {
              const errors: any = {};
              if (!values.fullName) {
                errors.fullName = t("register.required");
              }

              if (!values.phoneNumber) {
                errors.phoneNumber = t("register.required");
              }

              if (!/^\d{10}$/.test(values.phoneNumber)) {
                errors.phoneNumber = t("register.invalid-phone");
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await handleOnSubmit(
                  values.fullName,
                  values.phoneNumber,
                  eventData!.eventId!
                );
                setSubmitting(false);
                handleClose(ModalOptions.RegisterEvent);
              } catch (e: any) {
                setErrorRegestration(e);
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
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="fullName"
                    label={t("register.name")}
                    type="name"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    error={touched.fullName && !!errors?.fullName}
                    helperText={errors?.fullName}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <TextField
                    required
                    inputProps={{ maxLength: 10 }}
                    margin="dense"
                    id="phoneNumber"
                    label={t("register.phone")}
                    type="phoneNumber"
                    placeholder="0501234567"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    error={touched.phoneNumber && !!errors?.phoneNumber}
                    helperText={touched.phoneNumber && errors?.phoneNumber}
                  />
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
                  >
                    {t("register.submit")}
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
