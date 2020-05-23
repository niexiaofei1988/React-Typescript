# Monaco

微软开源的 Vscode 编辑器的代码编辑

## 参考

- [官网](https://microsoft.github.io/monaco-editor/index.html)
- [Monaco-Editor(Github)](https://github.com/Microsoft/monaco-editor)
- [Hacker News](https://news.ycombinator.com/item?id=11939557)

### APIS

- [create: 通过 monaco.create 方法创建一个编辑器实例](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html)

```js
const monacoInstance = monaco.create(document.getElementById('container)), opts);
```

- dispose: 实例销毁

#### languages

- register: 注册语言
- getLanguages: 获取已经注册过的语言
- setLanguageConfiguration: 设置语言(languageId: string; config: {})

### 实例方法

- layout(): 自适应

### diff editor

- [createDiffEditor: 返回实例](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.idiffeditorconstructionoptions.html)
- [setModel({ original: 源代码, modified: 修改过的代码 })](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.idiffeditormodel.html)
- renderSideBySide: 是否为行比对
- enableSplitViewResizing: 允许用户调整 diff 编辑器拆分视图的大小。默认为 true
