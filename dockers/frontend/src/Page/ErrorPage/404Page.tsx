import CommonHeader from '../../Components/CommonConponents/CommonHeader/CommonHeader'

interface IError404Page {
  errorMessage?: string
}

const Error404Page = ({ errorMessage }: IError404Page) => {
  errorMessage = errorMessage ?? '錯誤通知'

  return (
    <div>
      <CommonHeader isDarkTheme={false} />
      <p style={{ textAlign: 'center' }}> 404 not found {`: ${errorMessage}`}</p>
    </div>
  )
}

export default Error404Page