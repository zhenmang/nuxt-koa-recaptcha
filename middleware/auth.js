export default function ({ store, redirect }) {
  if (!store.state.nuxtToken) {
    return redirect('/Login')
  }
}