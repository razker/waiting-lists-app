import * as React from "react";
import { Formik } from "formik";
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
import styles from "./UnregisterModal.module.css";
import { ModalOptions } from "../Home";
import { WaitingListData } from "../../global/types";
import { useState } from "react";

type UnregisterModalProps = {
  isOpen: boolean;
  handleClose: (modalOption: ModalOptions, reason?: any) => void;
  eventData?: {
    eventId?: string;
    eventTitle?: string;
  };
  unregisterData?: WaitingListData;
  handleDelete: (
    waitingListToDelete: string,
    exchangeName?: string
  ) => Promise<any>;
};

export enum UnregisterReason {
  NotRelevant,
  Exchange,
}

export default function UnregisterModal({
  isOpen,
  handleClose,
  eventData,
  unregisterData,
  handleDelete,
}: UnregisterModalProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  const [errorDeleteFromEvent, setErrorDeleteFromEvent] = useState("");

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={(event, reason) => {
          setErrorDeleteFromEvent("");
          handleClose(ModalOptions.RegisterEvent, reason);
        }}
      >
        <DialogTitle>
          {t("unregister.title", { name: unregisterData?.fullName })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography color={theme.palette.error.main}>
              {errorDeleteFromEvent}
            </Typography>
          </DialogContentText>

          <DialogContentText style={{ marginBottom: 25 }}>
            <Typography
              style={{ whiteSpace: "pre-line" }}
              color={"black"}
              fontWeight={500}
            >
              {t("unregister.description", {
                name: unregisterData?.fullName,
                event: eventData?.eventTitle,
              })}
            </Typography>
          </DialogContentText>

          <Formik
            initialValues={{
              unregisterReason: -1,
              exchangeName: "",
            }}
            validate={(values) => {
              const errors: any = {};
              if (values.unregisterReason === -1) {
                errors.unregisterReason = t("unregister.required");
              }

              if (
                values.unregisterReason &&
                values.unregisterReason === UnregisterReason.Exchange &&
                !values.exchangeName
              ) {
                errors.exchangeName = t("unregister.required");
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await handleDelete(unregisterData!._id, values.exchangeName);
                setSubmitting(false);
                handleClose(ModalOptions.RegisterEvent);
              } catch (e) {
                setErrorDeleteFromEvent(t("unregister.error") as string);
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
                  <FormControl fullWidth>
                    <InputLabel>{t("unregister.reason-select")}</InputLabel>
                    <Select
                      labelId="unregisterReason"
                      id="unregisterReason"
                      name="unregisterReason"
                      value={values.unregisterReason}
                      label="unregisterReason"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.unregisterReason && !!errors?.unregisterReason
                      }
                    >
                      <MenuItem value={-1}>
                        <em> {t("unregister.reason-select-placeholder")}</em>
                      </MenuItem>
                      <MenuItem value={UnregisterReason.Exchange}>
                        {t("unregister.reason-exchange")}
                      </MenuItem>
                      <MenuItem value={UnregisterReason.NotRelevant}>
                        {t("unregister.reason-not-relevant")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className={styles.inputContainer}>
                  {values.unregisterReason === UnregisterReason.Exchange && (
                    <TextField
                      required
                      margin="dense"
                      id="exchangeName"
                      label={t("unregister.reason-exchange-name")}
                      type="exchangeName"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.exchangeName}
                      error={touched.exchangeName && !!errors?.exchangeName}
                      helperText={touched.exchangeName && errors?.exchangeName}
                    />
                  )}
                </div>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={() => {
                      setErrorDeleteFromEvent("");
                      handleClose(ModalOptions.RegisterEvent);
                    }}
                  >
                    {t("register.cancel")}
                  </Button>
                  <Button
                    variant="contained"
                    disabled={isSubmitting || !isValid || !dirty}
                    type="submit"
                    color={"error"}
                  >
                    {t("unregister.submit")}
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
