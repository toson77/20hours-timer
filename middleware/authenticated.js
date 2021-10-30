//認証通ってない時は、loginへ
export default function ({ store, redirect }) {
  if (!store.state.idToken) {
    return redirect('/login')
  }
}
