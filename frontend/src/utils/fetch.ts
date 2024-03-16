export const http = async (args: {
  method: string
  url: string
  form: any
  json: boolean
}) => {
  const { method, url, form, json } = args
  const fullUrl =
    url.indexOf('http') === 0 ? url : process.env.NEXT_PUBLIC_BASE_URL + url
  const options = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: !form
      ? undefined
      : form instanceof FormData
      ? form
      : JSON.stringify(form),
  }
  const res = await fetch(fullUrl, options)
  let content
  try {
    content = json ? await res.json() : await res.text()
  } catch (e) {}

  if (!res.ok) {
    if (!content) {
      throw res.statusText
    } else {
      throw content
    }
  } else {
    return content
  }
}
