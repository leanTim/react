
require('./like.css');
// let jsonp = require('../util/jsonp.js');
import jsonp from '../util/jsonp.js'
import React, {Component} from 'react'; 

class Like extends Component{
	// getInitialState: function() {
	// 	return {
	// 		stores: [],
	// 	}
	// }
	constructor (props) {
		super(props)
		this.state = {
			stores: []
		}
	}

	componentDidMount () {
		this.serverRequest = jsonp(this.props.source, "", "callback", (data) => {
			if(data.status) {				
				this.setState({
					stores: data.data,
				});			
			}else {
				alert(data.msg);
				reject("get data error!")
			}
		})
	}

	componentWillUnmount () {
		this.serverRequest.abort()
	}

	render () {
		let countId = 0;
		return (
			<div id="like">
				<p>猜你喜欢</p>
				{
					this.state.stores.map((item) => {
						return <div className="like_content" key={"like" + countId++}>
									<div className="like_link">
										<a href={ item.url }>
											<img src={ item.icon } alt=""/>
										</a>
									</div>
									<div className="like_desc">
										<span>
											{ item.desc }		
										</span>
									</div>
									<div className="like_price">
										<span>¥{ item.price }</span>
										<div><a href={ item.more }>看相似</a></div>
									</div>
								</div>
					})
				}
			</div>
		);
	}
}

export default Like;