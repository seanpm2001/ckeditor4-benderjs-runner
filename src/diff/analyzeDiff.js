function parseGitOutput( gitOutput ) {
	const filesStatus = gitOutput.split('\n').filter( s => s !== '');

	const maped = filesStatus.map(fileStatus => {
	   return fileStatus.split('\t');
	});

	return maped;
}

function getBenderAffectedPaths(filesStatus) {
	console.log(filesStatus);
	const benderPaths = [];

	filesStatus.forEach(element => {
		const mode = element[0];
		const filePath = element[1].slice(0, -3);
		//test is affected
		if( mode !== 'D' &&
			filePath.startsWith('tests/') &&
			!filePath.includes('/manuals/')
			)
		{
			if( filePath.includes( '/_assets' ) ||
				filePath.includes( '/_helpers' )
			)
			{
				//TODO go with config to ckeditor4 directory and extract all plugins tests
				benderPaths.push(filePath);
			} else {
				benderPaths.push(filePath);
			}
		}
		//plugin is affected ->
		//core is affected

		//other non relevant
	});

	return benderPaths;
}

module.exports = {
	parseGitOutput,
	getBenderAffectedPaths
};