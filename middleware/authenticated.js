export default function ({ store, redirect }) {
  if (!store.state.idToken) {
    return redirect('/login')
  }
}
