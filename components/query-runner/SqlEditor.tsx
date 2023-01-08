import ReactCodeMirror from "@uiw/react-codemirror";
import { sql, SQLite } from "@codemirror/lang-sql"
import { keymap } from "@codemirror/view";

interface ISqlEditorProp {
  onSubmit: () => void;
  onChange: (content: string) => void;
}

const SqlEditor = (prop: ISqlEditorProp) => {
  return (
    <ReactCodeMirror
      height="100%"
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
