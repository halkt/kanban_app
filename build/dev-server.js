// Node.jsのrequireスタイルでインポート
const bodyParser = require('body-parser')

// `Express`アプリケーションインスタンスを受け取る関数をエクスポート
module.exports = app => {
  // HTTPリクエストのbodyの内容をJSONとして解析するようにミドルウェアをインストール
  app.use(bodyParser.json())

  // ユーザー情報
  const users = {
    'foo@domain.com': {
      password: '12345678',
      userId: 1,
      token: '1234567890abcdef'
    }
  }

  // タスクリストID
  let nextTaskListId = 1
  // タスクID
  let nextTaskId = 1

  // タスクリストIDを生成するヘルパー関数
  const generateTaskListId = () => nextTaskListId++

  // タスクIDを生成するヘルパー関数
  const generateTaskId = () => nextTaskId++

  // タスクを作成をするヘルパー関数
  const createTask = listId => ({
    id: generateTaskId(),
    name: `タスク${nextTaskId - 1}`,
    description: `これはタスク${nextTaskId - 1}です。`,
    listId
  })

  // タスクリストを作成するヘルパー関数
  const createTaskList = (name, num) => {
    const id = generateTaskListId()
    const list = { id, name, items: [] }
    for (let i = 0; i < num; i++) {
      list.items.push(createTask(id))
    }
    return list
  }

  // ボード情報
  const board = {
    lists: [
      createTaskList('TODO', 2),
      createTaskList('WIP', 1),
      createTaskList('DONE', 1)
    ]
  }

  // ログインAPIのエンドポイント'/auth/login'
  app.post('/auth/login', (req, res) => {
    const { email, password } = req.body
    const user = users[email]
    if (user) {
      if (user.password !== password) {
        res.status(401).json({ message: 'ログインに失敗しました。' })
      } else {
        res.json({ userId: user.userId, token: user.token })
      }
    } else {
      res.status(404).json({ message: 'ユーザーが登録されていません。' })
    }
  })

  // ボードタスクリストAPIのエンドポイント'/lists'
  app.get('/lists', (req, res) => {
    const token = req.headers['x-kbn-token']
    if (!token) {
      return res.status(403).json({ message: '許可されていません。' })
    }
    res.json({ lists: board.lists })
  })
}
