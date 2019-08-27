/**
 * @desc: 普通代码编辑
 * 1. 继承 monaco ts 文件
 */

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

interface EditorProps extends BasicEditorProps {
  model?: any;
  theme?: string;
}

function MonacoEditor(props: EditorProps, ref: React.Ref<unknown>) {
  const { language, theme, value, height, width, ...rest } = props;
  const editorRef = useRef();
  const monacoInstance = useRef(null);

  useEffect(() => {
    if (monacoInstance.current) {
      // monaco.editor.setModelLanguage(model, language);
      monacoInstance.current.setValue(value);
    }
  }, [value]);

  // 初始化实例
  function initMonaco() {
    if (editorRef.current) {
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        value,
        theme,
        language,
        ...rest,
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
