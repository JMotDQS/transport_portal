function generateReports() {
	console.log("generateReports() called");

	reportingPromise('reporting').then(
		function(resolve) {
			console.log("reportingPromise:Success");
			alert("Reports created");
		}
	).catch(
		function(reject) {
			console.log("reportingPromise:Fail");
			alert("Reports NOT created");
		}
	).finally(
		function() {
			console.log("reportingPromise:Moving On.");
		}
	);
}