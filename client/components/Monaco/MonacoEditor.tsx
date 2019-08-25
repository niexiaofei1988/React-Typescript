/**
 * @desc: 普通代码编辑
 */

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as main from 'monaco-editor/esm/vs/editor/editor.main';

interface EditorProps extends BasicEditorProps {
  model?: any;
}

function MonacoEditor(props: EditorProps, ref: React.Ref<unknown>) {
  const { language, model, theme, value, height, width } = props;
  const editorRef = useRef();
  const monacoInstance = useRef(null);

  useEffect(() => {
    if (monacoInstance.current) {
      monacoInstance.current.setModelLanguage(model, language);
    }
  }, [language]);

  // 初始化实例
  function initMonaco() {
    if (editorRef.current) {
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        value,
        theme,
        language,
      });
    }
  }

  // 销毁实例
  function destroyMonaco() {
    if (monacoInstance.current && monacoInstance.current.dispose) {
      monacoInstance.current.dispose();
      monacoInstance.current = null;
    }
  }

  useEffect(() => {
    initMonaco();
    monacoInstance.current.layout();
    return () => destroyMonaco();
  }, [width, height]);
  useImperativeHandle(ref, () => ({
    getInstance() {
      return monacoInstance;
    },
    destroyMonaco,
  }));
  return <div style={{ width, height }} ref={editorRef} />;
}

MonacoEditor.defaultProps = {
  height: 500,
  width: '100%',
  theme: 'vs',
  language: 'typescript',
};

export default forwardRef(MonacoEditor);
