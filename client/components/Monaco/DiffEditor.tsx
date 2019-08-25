import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

interface DiffEditorProps extends BasicEditorProps {
  modified: string;
  opts: any;
}

/**
 * value: 源代码
 * modified: 修改过的代码
 */
function DiffEditor(props: DiffEditorProps) {
  const { value, modified, opts = {} } = props;
  const [hsModel, setHsModel] = useState({ lhsModel: null, rhsModel: null });
  const { lhsModel, rhsModel } = hsModel;
  const diffRef = useRef(null);
  const { height, width } = props;
  const [diffInstance, setDiffInstance] = useState(null);

  useEffect(() => {
    setHsModel({
      lhsModel: monaco.editor.createModel(value, 'text/javascript'),
      rhsModel: monaco.editor.createModel(modified, 'text/javascript'),
    });
  }, [modified, value]);

  useEffect(() => {
    diffInstance && diffInstance.updateOptions(opts);
  }, [opts]);

  // 实例化编辑器
  function initDiffMonaco() {
    setDiffInstance(
      monaco.editor.createDiffEditor(diffRef.current, {
        enableSplitViewResizing: false,
      })
    );
  }

  // 销毁实例
  function destroyMonaco() {
    if (diffInstance && diffInstance.dispose) {
      diffInstance.dispose();
      setDiffInstance(null);
    }
  }

  // 源代码 和 修改过的代码对比
  useEffect(() => {
    if (diffInstance) {
      diffInstance.setModel({
        original: lhsModel,
        modified: rhsModel,
      });
    }
  }, [lhsModel, rhsModel]);

  useEffect(() => {
    initDiffMonaco();
    return () => destroyMonaco;
  }, []);

  return <div ref={diffRef} style={{ height, width }} />;
}

DiffEditor.defaultProps = {
  width: '100%',
  height: 500,
};

export default DiffEditor;
