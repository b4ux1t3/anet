import React from 'react'
import Page from 'components/Page'
import {Link} from 'react-router'
import {Table, ListGroup, ListGroupItem} from 'react-bootstrap'

import API from 'api'
import {Organization, Person, Position, Poam} from 'models'
import Breadcrumbs from 'components/Breadcrumbs'
import Form from 'components/Form'

export default class OrganizationShow extends Page {
	constructor(props) {
		super(props)
		this.state = {
			organization: {
				id: props.params.id,
				positions: [],
				poams: [],
			},
		}
	}

	fetchData(props) {
		API.query(/* GraphQL */`
			organization(id:${props.params.id}) {
				id, name, type
				parentOrg { id, name }
				poams { id, longName, shortName }
				positions {
					id, name, code
					person { id, name }
					associatedPositions {
						id, name, code
						person { id, name }
					}
				},
				childrenOrgs { id, name },
				approvalSteps {
					approverGroup { 
						id, name, members { id, name }
					}
				}
			}
		`).then(data => this.setState({organization: data.organization}))
	}

	render() {
		let org = this.state.organization

		let positionsNeedingAttention = org.positions.filter(position => !position.person || !position.code || !position.associatedPositions.length)
		let supportedPositions = org.positions.filter(position => positionsNeedingAttention.indexOf(position) === -1)

		let poamsContent = ''
		if (org.type === 'ADVISOR_ORG') {
			poamsContent = <fieldset>
				<legend>POAMs / Pillars</legend>
				{this.renderPoamsTable(org.poams)}
			</fieldset>
		}

		return (
			<div>
				<Breadcrumbs items={[[org.name || 'Organization', Organization.pathFor(org)]]} />

				<Form static formFor={org} horizontal>
					<fieldset>
						<legend>{org.name}</legend>

						<Form.Field id="type">
							{org.type && org.type.split('_')[0]}
						</Form.Field>

						{org.parentOrg && <Form.Field id="parentOrg" label="Parent">
							<Link to={Organization.pathFor(org)}>
								{org.parentOrg.name}
							</Link>
						</Form.Field>}

						{org.childrenOrgs && org.childrenOrgs.length > 0 && <Form.Field id="childrenOrgs" label="Sub-Orgs">
							<ListGroup>
							{org.childrenOrgs.map( org =>
								<ListGroupItem key={org.id} ><Link to={`/organizations/${org.id}`}>{org.name}</Link></ListGroupItem>
							)}
							</ListGroup>
						</Form.Field>}
					</fieldset>

					{poamsContent}

					<fieldset>
						<legend>Positions needing attention</legend>
						{this.renderPositionTable(positionsNeedingAttention)}
					</fieldset>

					<fieldset>
						<legend>Supported laydown</legend>
						{this.renderPositionTable(supportedPositions)}
					</fieldset>

					<h2>Approval Process</h2>
					{org.approvalSteps && org.approvalSteps.map((step, idx) =>
						<fieldset key={"step_" + idx}>
							<legend>Step {idx + 1}: {step.approverGroup.name}</legend>
							<Table>
								<thead><tr><th>Name</th></tr></thead>
								<tbody>
									{step.approverGroup.members.map(person => 
										<tr key={person.id}>
											<td><Link to={`/people/${person.id}`}>{person.name}</Link></td>
										</tr>
									)}
								</tbody>
							</Table>
						</fieldset>
					)}
				</Form>
			</div>
		)
	}

	renderPositionTable(positions) {
		return <Table>
			<thead>
				<tr>
					<th>NATO billet</th>
					<th>Advisor</th>
					<th>Afghan billet</th>
					<th>Afghan</th>
				</tr>
			</thead>
			<tbody>
				{Position.map(positions, position =>
					position.associatedPositions.length
					? Position.map(position.associatedPositions, other => this.renderPositionRow(position, other))
					: this.renderPositionRow(position)
				)}
			</tbody>
		</Table>
	}

	renderPositionRow(position, other) {
		let key = position.id
		let otherCodeCol, otherNameCol
		if (other) {
			key += '.' + other.id
			otherCodeCol = <td>
				<Link to={Position.pathFor(other)}>{other.code || "Uncoded"}</Link>
			</td>

			otherNameCol = other.person
				? <td><Link to={Person.pathFor(other.person)}>{other.person.name}</Link></td>
				: <td className="text-danger">Unfilled</td>
		}

		otherCodeCol = otherCodeCol || <td></td>
		otherNameCol = otherNameCol || <td></td>

		return <tr key={key}>
			<td>
				<Link to={Position.pathFor(position)}>{position.code || "Uncoded"}</Link>
			</td>

			{position.person
				? <td><Link to={Person.pathFor(position.person)}>{position.person.name}</Link></td>
				: <td className="text-danger">Unfilled</td>
			}

			{otherCodeCol}
			{otherNameCol}
		</tr>
	}

	renderPoamsTable(poams) {
		return <Table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{Poam.map(poams, poam =>
					<tr key={poam} >
						<td><Link to={Poam.pathFor(poam)}>{poam.shortName}</Link></td>
						<td>{poam.longName}</td>
					</tr>
				)}
			</tbody>
		</Table>
	}
}