import RadarChart from './RadarChart'

const mvpData = {
	axes: [
		{
			name: "apis",
			items: [
				"manual",
				"github",
				"linkedin",
				"gitlab",
				"slideshare",
				"xing",
				"import"
			],
			scope: 3
		},
		{
			name: "export",
			items: ["pdf", "html", "online hosted"],
			scope: 1
		},
		{
			name: "security",
			items: ["user", "3rd party", "magic link"],
			scope: 2
		}
	]
};


const mvpGraph = new RadarChart(600, 600, mvpData);
mvpGraph.draw();
