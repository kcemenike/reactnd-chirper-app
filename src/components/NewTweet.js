import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {
  state = {
    text: "",
    toHome: false
  }
  handleChange = (e) => {
    const text = e.target.value
    this.setState(() => ({ text }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { text } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddTweet(text, id))
    this.setState(() => ({
      text: "",
      toHome: id ? false : true
    }))
  }
  render() {
    const { text, toHome } = this.state

    if (toHome) {
      return <Redirect to="/" />
    }

    const tweetLeft = 280 - text.length
    return (
      <div>
        <h3 className="center">Compose new tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            className='textarea'
            maxLength="280"
            value={text}
            onChange={this.handleChange}
            placeholder="What's on your mind?"
          />
          {tweetLeft <= 100 && (
            <div>{tweetLeft} characters left</div>
          )}
          <button
            className="button"
            disabled={text === ""}
            type="submit"
          >Submit</button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet)