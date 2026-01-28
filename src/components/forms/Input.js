import BaseModel, { Field } from "../../state/BaseModel";
function getInput(field: Field) {
  switch (field.ui) {
    case "text":
      return (
        <input
          value={field.value}
          onChange={(e) => {
            field.setValue(e.target.value);
          }}
          type="text"
        />
      );
    case "textarea":
      return (
        <textarea
          value={field.value}
          onChange={(e) => {
            field.setValue(e.target.value);
          }}
        />
      );
  }
}
const Input = (props) => {
  const { model, field } = props;

  return (
    <div className="form-group mt-5">
      <label>{field.label}</label>
      {getInput(field)}
      {field.error && model.validated ? (
        <small className="form-text regular_12_ac">{field.error}</small>
      ) : null}
    </div>
  );
};
