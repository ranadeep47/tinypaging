if(process.env.NODE_ENV === 'development'){
	module.exports = {
		host 		: "localhost",
		port 		: 8080
	}
}
else {
	module.exports = {
		host 	 : rocess.env.OPENSHIFT_NODEJS_IP,
		port 	 : process.env.OPENSHIFT_NODEJS_PORT	
	}
}