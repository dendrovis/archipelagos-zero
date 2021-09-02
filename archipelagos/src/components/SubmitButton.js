/** Styling */
import Classes from "./SubmitButton.module.css";
import GlobalClasses from "../common/global.module.css";

/**
 * Submit Button of the application
 * @param {object} event
 * @param {string} text
 * @returns {JSX.Element}
 */
export default function SubmitButton({ event, text }) {
  return (
    <div className={GlobalClasses.buttonContainer}>
      <button
        onClick={event}
        className={Classes.btnEffect + " " + Classes.customButton}
      >
        {text}
      </button>
    </div>
  );
}
