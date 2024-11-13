function generateReports() {
	console.log("generateReports() called");

	reportingPromise('reporting').then(
		function(resolve) {
			if(resolve) {
				alert("Reports created");
			} else {
				alert("Tracking data NOT found");
			}
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