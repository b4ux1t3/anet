import History from 'components/History'
import {Organization} from 'models'
import dict from 'dictionary'

let userTour = (currentUser) => { return {
	id: 'home',
	steps: [
		{
			title: 'Welcome',
			content: 'Welcome to ANET! This tour will quickly show you where to find information in ANET 2, and how to draft a report.',
			target: '.persistent-tour-launcher',
			placement: 'left',
		},
			{
			title: 'My ANET snapshot',
			content: 'This area shows you how many reports you\'ve drafted but haven\'t submitted, the number of your reports waiting for approval from your organization\'s approval chain, and your organization\'s reports published in the last 7 days and upcoming engagements.',
			target: '.home-tile-row',
			placement: 'bottom',
		},
		{
			title: 'Home',
			content: 'Click on the logo to get back to your homepage, from wherever you are.',
			target: '.logo img',
			placement: 'right',
			fixedElement: true
		},
		{
			title: 'Search',
			content: 'Search for reports, people, keywords, or organizations. You can save searches to your homepage.',
			target: 'searchBarInput',
			placement: 'bottom',
			fixedElement: true
		},
		{
			title: 'Saved searches',
			content: 'When you save searches, they appear in this list. Saved searches are a good way to stay update on certain topics. For example, you can save a search for the word "Corruption" to see reports that mention that keyword. If you have more than one saved search, you can choose which one to display by selecting it from this list.',
			target: 'savedSearchSelect',
			placement: 'top',
			fixedElement: true
		},
		{
			title: 'New Report',
			content: 'Create a report by clicking on this button.',
			target: 'createButton',
			placement: 'left',
			fixedElement: true,
		}
	]
}}

let superUserTour = (currentUser) => { return {
	id: 'home',
	steps: [
		{
			title: 'Welcome',
			content: 'Welcome to ANET! This guided tour shows super users how to find reports you need to approve and keep your organization up to date.',
			target: '.persistent-tour-launcher',
			placement: 'left',
		},
		{
			title: 'Home',
			content: 'Click on the logo to get back to your homepage, from wherever you are.',
			target: '.logo img',
			placement: 'right',
			fixedElement: true
		},
		{
			title: 'Search',
			content: 'Search for reports, people, keywords, or organizations. You can save searches to your homepage.',
			target: 'searchBarInput',
			placement: 'bottom',
			fixedElement: true
		},
		{
			title: 'My ANET snapshot',
			content: 'This area shows you the reports that need your approval as well as your organization\'s draft reports, reports submitted in the last 7 days, and upcoming engagements.',
			target: '.home-tile-row',
			placement: 'bottom',
		},
		{
			title: 'Create',
			content: 'If you need to create a new report, person, position, or location, click on this "Create" button and select what you need from the menu.',
			target: 'createButton',
			placement: 'left',
			fixedElement: true,
		},
		{
			title: 'My organization',
			content: 'You can navigate to your organization by clicking on the "My organization" link. Click "next" to continue this tour on your organization\'s page.',
			target: 'my-organization',
			placement: 'right',
			fixedElement: true,
			multipage: true,
			onNext: () => History.push(Organization.pathFor(currentUser.position.organization))
		},
		{}
	]
}}

let reportTour = (currentUser) => {
	let poamShortTitle = dict.lookup("POAM_SHORT_NAME")
	return {
	id: 'report',
	steps: [
		{
			title: 'Meeting goal(s)',
			content: "Use this section to tell readers why you met with your principal. Were you working on a specific goal or problem with them? This will be part of your report's summary, so use this space to tell readers the high-level purpose of your engagement.",
			target: 'intent',
			placement: 'bottom',
		},
		{
			title: 'Engagement date',
			content: 'When did this engagement happen, or when will it take place? Choosing a date in the future will create an upcoming engagement. On the day of your upcoming engagement you\'ll get an email letting you know that the report you started moved back to your drafts.',
			target: '#engagementDate',
			placement: 'right',
		},
		{
			title: 'Engagement location',
			content:
				'Start typing the location of where the engagement took place. Select one of the options available, or ask your super user to add it.',
			target: '#location',
			placement: 'right',
		},
		{
			title: 'Atmospherics',
			content: 'Select the atmosphere of your meeting. This information is used in threat assessments. Highlight specific issues or concerns in the details section below.',
			target: '#neutralAtmos',
			placement: 'bottom',
		},
		{
			title: 'Attendee(s)',
			content: 'Start typing the name of everyone who was at the meeting, including Afghan principals and NATO members. Select one of the options available or ask your super user to add it.',
			target: '#attendees',
			placement: 'right',
		},
			{
			title: 'Recents',
			content: "If you've written reports in the past, your recent selections of attendees, " + poamShortTitle + "s, and locations will display to the right in a section called \"Recents\". You can click on one of the shortcuts to quickly add it to your report.",
			target: '#attendees',
			placement: 'bottom',
		},
		{
			title: 'Primary advisor and principal',
			content: "Use these check boxes to indicate who the primary advisor and primary principal was. The people you choose will display on your report's summary as the main individuals involved in your engagement.",
			target: '#attendeesTable',
			placement: 'bottom',
		},
		{
			title: poamShortTitle + 's',
			content: 'Search for the ' + poamShortTitle + 's that apply to this engagement. You can search for ' + poamShortTitle + 's in any organization, including your organization and its sub-organizations. ' + poamShortTitle + 's are not required.',
			target: '#poams',
			placement: 'right',
		},
		{
			title: 'Key outcomes',
			content: "Use this section to tell readers what the main information or results from your engagement were. This will be displayed in your report's summary, so include information that you think would be valuable for leadership and other organizations to know.",
			target: '#keyOutcomes',
			placement: 'right',
		},
		{
			title: 'Next steps',
			content: "Here, tell readers about the next concrete steps that you'll be taking to build on the progress made in your engagement. This will be displayed in your report's summary, so include information that will explain to leadership what you are doing next, as a result of your meeting's outcomes.",
			target: '#nextSteps',
			placement: 'right',
		},
		{
			title: 'Detailed report',
			content: `If there's more information from your meeting that you'd like to include, click on the "Add detailed comments" button. You will have additional space to record discussion topics and notes that may be helpful to you, your organization, or leadership later on. This section does not display in the report summary.`,
			target: '#toggleReportDetails',
			placement: 'right',
		},
		{
			title: 'Preview and submit',
			content: "Pressing this button will save the report as a draft and take you to the preview page. You will have a chance to review your report before you send it for approval and then to the SFAC.",
			target: '#formBottomSubmit',
			placement: 'left',
		},
		{
			title: 'Start this tour again',
			content: 'Click this button to restart the tour.',
			target: '.persistent-tour-launcher',
			placement: 'left',
		},
	]
}}

let orgTour = (currentUser) => {
	let poamShortTitle = dict.lookup("POAM_SHORT_NAME")
	return {
	id: 'org',
	steps: [
		{
			title: 'Your organization\'s information',
			content: 'This section shows your organization\'s super users and sub-organizations. Keep in mind that super users in a sub-organization can only update information for that sub-organization.',
			target: 'info',
			placement: 'bottom',
		},
		{
			title: 'Navigating your organization\'s page',
			content: 'When viewing your organization, you can quickly see and navigate to each section on this page using the sub-menu under your organization\'s name.',
			target: 'my-organization',
			placement: 'right',
		},
		{
			title: 'Supported positions',
			content: 'This section shows positions in your organization that currently have people assigned to them. The billet column tells you the name and billet code of the position. To update this information, click on the position and select the "Edit" option.',
			target: '#supportedPositions h2',
			placement: 'top',
		},
		{
			title: 'Vacant positions',
			content: 'Here you\'ll find positions that don\'t have anyone assigned to them. To assign someone to the position, or to mark the position inactive, click on the position.',
			target: '#vacantPositions h2',
			placement: 'top',
		},
		{
			title: 'Approval process',
			content: 'Set up or update the approval process for reports authored in your organization by clicking "Edit" on the top of the page. We recommend having more than one approver in each step so that either person can approve the report. When a report has gone through every step in your approval chain, it will automatically go into that day\'s daily rollup. You can add anyone in a position to your approval chain, they do not need to be a super user. Keep in mind that you\'ll need to set up an approval chain for each sub-organization as well.',
			target: '#approvals h2',
			placement: 'top',
		},
		{
			title: poamShortTitle + 's',
			content: 'The ' + dict.lookup('POAM_LONG_NAME') + ' that your organization is responsible for will be displayed in this section. If you need to make changes, or if ' + poamShortTitle + 's change, you can update that information by clicking on the ' + poamShortTitle + '.',
			target: '#poams h2',
			placement: 'top',
		},
		{
			title: 'Your orginization\'s reports',
			content: 'Here, you\'ll find the complete list of all reports authored by your members of your organization.',
			target: '#reports h2',
			placement: 'top',
		},
		{
			title: 'Edit your organization',
			content: 'If you need to make changes to any of the information we just went over, click the "Edit" button.',
			target: 'editButton',
			placement: 'left',
		},
		{
			title: 'Take a guided tour',
			content: 'Click on this button to take this page\'s tour again.',
			target: '.persistent-tour-launcher',
			placement: 'left',
		},
	]
}}

let positionTour = (currentUser) => {
	let poamShortTitle = dict.lookup("POAM_SHORT_NAME")
	return {
		id: 'position',
		steps: [
			{
				title: "Positions",
				content: "This section allows you to quickly review this position's detailed information, such as the position's billet or tashkil code, status, and organization.",
				target: '.persistent-tour-launcher',
				placement: 'left',
			},
			{
				title: "Type of user",
				content: "There are three types of users: user, super user, and administrator. Super users can give other positions either user or super user privileges. Users are able to take basic actions, like submitting reports, using search, and reviewing the daily rollup. Super users are able to edit positions, people, and " + poamShortTitle + "s in their organization, as well as locations. This section isn't visible if you're looking at a tashkil position.",
				target: '#type',
				placement: 'bottom',
			},
			{
				title: "Active/inactive status",
				content: "Positions can be either active or inactive. Changing the status to \"Inactive\" means that your organization no longer supports that position / function. This is different than a vacant position, which is one that does not have a person assigned to it. Positions will move to the \"Vacant\" section of your organization's page automatically when no one is assigned to it.",
				target: '#status',
				placement: 'bottom',
			},
			{
				title: "Current assigned person",
				content: "This section shows you who is currently assigned to this position. For billet positions, you'll see the NATO member in this position. For taskhil positions, you'll see the current Afghan principal in that position. You can click the \"Change assigned person\" button to quickly change who is in this position.",
				target: '#assigned-advisor h2',
				placement: 'top',
			},
			{
				title: "Assigned Afghan principal or Advisor",
				content: "If you're looking at a NATO billet position, you'll see the people this position is responisble for advising. If you're looking at a tashkil position, you'll see the advisors advising that Afghan tashkil here. You can update this information by clicking the \"Change assigned advisors\" or \"Change assigned Afghan principals\" button, depending on what type of position you're looking at.",
				target: '#assigned-principal h2',
				placement: 'top',
			},
			{
				title: "Previous position holders",
				content: "The previous position holders section will show you other people who have previously held this position.",
				target: '#previous-people h2',
				placement: 'top',
			},
			{
				title: 'Take a guided tour',
				content: 'Click on this button to take this page\'s tour again.',
				target: '.persistent-tour-launcher',
				placement: 'left',
			},
		]
	}
}

let personTour = (currentUser) => { return {
	id: 'person',
	steps: [
		{
			title: "Information about this person",
			content: "You can review this person's basic information, including their contact information, and see if they are \"Active\". A super user should change a person to \"Inactive\" when they are no longer in a job with NATO or the Afghan government. Setting them as inactive keeps them from being added to reports as attendees.",
			target: '#phoneNumber',
			placement: 'bottom',
		},
		{
			title: "Current assigned position",
			content: "This section tells you which position this person is currently in. If you need to remove them from this position, or assign them to a different position, you can do so from here.",
			target: '#current-position h2',
			placement: 'top',
		},
		{
			title: "Authored reports",
			content: "If this person has authored any reports, you'll be able to see them displayed here. If you're looking at an Afghan principal's page, you won't see this section.",
			target: '#reports-authored h2',
			placement: 'top',
		},
		{
			title: "Engagements attended by this person",
			content: "If this person has been mentioned as an attendee of reports, those reports will display here.",
			target: '#reports-attended h2',
			placement: 'top',
		},
		{
			title: 'Take a guided tour',
			content: 'Click on this button to take this page\'s tour again.',
			target: '.persistent-tour-launcher',
			placement: 'left',
		},
	]
}}

export {userTour, superUserTour, reportTour, orgTour, positionTour, personTour}
