import * as React from "react";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import styles from "./RegisterModal.module.css";
import { ModalOptions } from "../Home";

type RegisterModalProps = {
  isOpen: boolean;
  handleClose: (modalOption: ModalOptions, reason?: any) => void;
  eventData?: {
    eventId?: string;
    eventTitle?: string;
  };
};

export default function RegisterModal({
  isOpen,
  handleClose,
  eventData,
}: RegisterModalProps) {
  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={(event, reason) =>
          handleClose(ModalOptions.RegisterEvent, reason)
        }
      >
        <DialogTitle>{eventData?.eventTitle}</DialogTitle>
        <DialogContent>
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

              if (!/^\d+$/.test(values.phoneNumber)) {
                errors.phoneNumber = t("register.invalid-phone");
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                handleClose(ModalOptions.RegisterEvent);
              }, 400);
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
                    margin="dense"
                    id="phoneNumber"
                    label={t("register.phone")}
                    type="phoneNumber"
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
                    disabled={isSubmitting || !isValid}
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
