import ReactCodeMirror from "@uiw/react-codemirror";
import { sql, SQLite } from "@codemirror/lang-sql"
import { keymap } from "@codemirror/view";
import { useConfig } from "hooks/useConfig";

interface ISqlEditorProp {
  onSubmit: () => void;
  onChange: (content: string) => void;
  onBlur: () => void;
}

const SqlEditor = (prop: ISqlEditorProp) => {
  const { config } = useConfig();

  return (
    <ReactCodeMirror
      height="100%"
      value={config.editorContent} // this sets initial value only.
      onBlur={() => prop.onBlur()}
      style={{ height: "calc(100% - 100px)", overflow: "scroll" }}
      extensions={[
        sql({ dialect: SQLite }),
        keymap.of([
          {
            key: "Shift-Enter",
            run: () => {
              prop.onSubmit();
              return true;
            },
          },
        ]),
      ]}
      onChange={prop.onChange}
    />
  );
}

export default SqlEditor;
