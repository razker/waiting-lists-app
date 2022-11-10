import styles from "./Template.module.css";

type TemplateProps = {
  message: string;
};

const Template = ({ message }: TemplateProps) => (
  <div className={styles.template}>{message}</div>
);

export default Template;
