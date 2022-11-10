import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import whatsapp from "../../static/whatsapp-icon.png";
import phone from "../../static/phone-icon.png";

type EventContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fullName?: string;
  phoneNumber?: string;
};

const EventContactModal = ({
  isOpen,
  onClose,
  fullName,
  phoneNumber,
}: EventContactModalProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {t("register.contact.title", { name: fullName })}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <a
            style={{
              textDecoration: "none",
              color: useTheme().palette.text.primary,
            }}
            href={`https://wa.me/+972${phoneNumber?.substring(1)}`}
          >
            <Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <img alt={"whatsapp"} src={whatsapp} height={40} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography fontWeight={500} variant="subtitle1">
                    {t("register.contact.whatsapp")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </a>

          <Box sx={{ marginTop: 2 }}>
            <a
              style={{
                textDecoration: "none",
                color: useTheme().palette.text.primary,
              }}
              href={`tel://${phoneNumber}`}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <img
                  style={{ padding: 3 }}
                  alt={"phonecall"}
                  src={phone}
                  height={40}
                />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography fontWeight={500} variant="subtitle1">
                    {t("register.contact.phone-call")}
                  </Typography>
                </Box>
              </Box>
            </a>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EventContactModal;
