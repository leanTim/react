require("./header.css");
require("../lib/swiper.min.css");
let Swiper = require("../lib/swiper.min.js");
// let jsonp = require('../util/jsonp.js');
import jsonp from "../util/jsonp.js";

import React, { Component } from "react";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imgUrls: []
		};
	}

	componentDidMount() {
		this.serverRequest = jsonp(this.props.source, "", "callback", data => {
			if (data.status) {
				//如果组件渲染到了 DOM 中，isMounted() 返回 true。
				//可以使用该方法保证 setState() 和 forceUpdate()
				//在异步场景下的调用不会出错。

				this.setState({
					imgUrls: data.data
				});
				new Swiper("#header .swiper-container", {
					loop: true,
					pagination: ".swiper-pagination",
					paginationClickable: true,
					autoplay: 3000,
					autoplayDisableOnInteraction: false
				});
			} else {
				alert(data.msg);
			}
		});
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

	render() {
		let countId = 0;
		return (
			<div id="header">
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{this.state.imgUrls.map(url => {
							return (
								<div className="swiper-slide" key={"header" + countId++}>
									<img className="img" src={url} />
								</div>
							);
						})}
					</div>
					<div className="swiper-pagination" />
				</div>
			</div>
		);
	}
}

export default Header;
