package mil.dds.anet.beans.search;

import java.util.List;

import org.joda.time.DateTime;

import mil.dds.anet.beans.Report.Atmosphere;
import mil.dds.anet.beans.Report.ReportCancelledReason;
import mil.dds.anet.beans.Report.ReportState;

public class ReportSearchQuery implements ISearchQuery {

	public enum ReportSearchSortBy { CREATED_AT, ENGAGEMENT_DATE, RELEASED_AT } 
	
	Integer authorId;
	String text;
	DateTime engagementDateStart;
	DateTime engagementDateEnd;
	DateTime createdAtStart;
	DateTime createdAtEnd;
	DateTime releasedAtStart;
	DateTime releasedAtEnd;
	Integer attendeeId;
	Atmosphere atmosphere;
	
	//Can use either orgId or one or both of advisorOrgId and principalOrgId
	//only use orgId if you don't know the type of the organization. 
	Integer advisorOrgId;
	Boolean includeAdvisorOrgChildren;
	//Set principalOrgId or advisorOrgId = -1 to tell ANET to search for reports specifically with a NULL organizationId. 
	Integer principalOrgId;
	Boolean includePrincipalOrgChildren;
	Integer orgId;
	Boolean includeOrgChildren;
	
	Integer locationId;
	Integer poamId;
	Integer pendingApprovalOf;
	List<ReportState> state;
	ReportCancelledReason cancelledReason;

	ReportSearchSortBy sortBy;
	SortOrder sortOrder;
	
	int pageNum;
	int pageSize;
	
	public ReportSearchQuery() { 
		this.pageNum = 0;
		this.pageSize = 10;
		this.sortBy = ReportSearchSortBy.CREATED_AT;
		this.sortOrder = SortOrder.DESC;
	}

	public Integer getAuthorId() {
		return authorId;
	}

	public void setAuthorId(Integer authorId) {
		this.authorId = authorId;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public DateTime getEngagementDateStart() {
		return engagementDateStart;
	}

	public void setEngagementDateStart(DateTime engagementDateStart) {
		this.engagementDateStart = engagementDateStart;
	}

	public DateTime getEngagementDateEnd() {
		return engagementDateEnd;
	}

	public void setEngagementDateEnd(DateTime engagementDateEnd) {
		this.engagementDateEnd = engagementDateEnd;
	}

	public DateTime getCreatedAtStart() {
		return createdAtStart;
	}

	public void setCreatedAtStart(DateTime createdAtStart) {
		this.createdAtStart = createdAtStart;
	}

	public DateTime getCreatedAtEnd() {
		return createdAtEnd;
	}

	public void setCreatedAtEnd(DateTime createdAtEnd) {
		this.createdAtEnd = createdAtEnd;
	}

	public DateTime getReleasedAtStart() {
		return releasedAtStart;
	}

	public void setReleasedAtStart(DateTime releasedAtStart) {
		this.releasedAtStart = releasedAtStart;
	}

	public DateTime getReleasedAtEnd() {
		return releasedAtEnd;
	}

	public void setReleasedAtEnd(DateTime releasedAtEnd) {
		this.releasedAtEnd = releasedAtEnd;
	}

	public Integer getAttendeeId() {
		return attendeeId;
	}

	public void setAttendeeId(Integer attendeeId) {
		this.attendeeId = attendeeId;
	}

	public Atmosphere getAtmosphere() {
		return atmosphere;
	}

	public void setAtmosphere(Atmosphere atmosphere) {
		this.atmosphere = atmosphere;
	}

	public Integer getAdvisorOrgId() {
		return advisorOrgId;
	}

	public void setAdvisorOrgId(Integer advisorOrgId) {
		this.advisorOrgId = advisorOrgId;
	}

	public boolean getIncludeAdvisorOrgChildren() {
		return (includeAdvisorOrgChildren == null) ? false : includeAdvisorOrgChildren;
	}

	public void setIncludeAdvisorOrgChildren(Boolean includeAdvisorOrgChildren) {
		this.includeAdvisorOrgChildren = includeAdvisorOrgChildren;
	}

	public Integer getPrincipalOrgId() {
		return principalOrgId;
	}

	public void setPrincipalOrgId(Integer principalOrgId) {
		this.principalOrgId = principalOrgId;
	}

	public boolean getIncludePrincipalOrgChildren() {
		return (includePrincipalOrgChildren == null) ? false : includePrincipalOrgChildren;
	}

	public void setIncludePrincipalOrgChildren(Boolean includePrincipalOrgChildren) {
		this.includePrincipalOrgChildren = includePrincipalOrgChildren;
	}

	public Integer getOrgId() {
		return orgId;
	}

	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}

	public boolean getIncludeOrgChildren() {
		return (includeOrgChildren == null) ? false : includeOrgChildren;
	}

	public void setIncludeOrgChildren(boolean includeOrgChildren) {
		this.includeOrgChildren = includeOrgChildren;
	}

	public Integer getLocationId() {
		return locationId;
	}

	public void setLocationId(Integer locationId) {
		this.locationId = locationId;
	}

	public Integer getPoamId() {
		return poamId;
	}

	public void setPoamId(Integer poamId) {
		this.poamId = poamId;
	}

	public Integer getPendingApprovalOf() {
		return pendingApprovalOf;
	}

	public void setPendingApprovalOf(Integer pendingApprovalOf) {
		this.pendingApprovalOf = pendingApprovalOf;
	}

	public List<ReportState> getState() {
		return state;
	}

	public void setState(List<ReportState> state) {
		this.state = state;
	}

	public ReportCancelledReason getCancelledReason() {
		return cancelledReason;
	}

	public void setCancelledReason(ReportCancelledReason cancelledReason) {
		this.cancelledReason = cancelledReason;
	}

	public ReportSearchSortBy getSortBy() {
		return sortBy;
	}

	public void setSortBy(ReportSearchSortBy sortBy) {
		this.sortBy = sortBy;
	}

	public SortOrder getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(SortOrder sortOrder) {
		this.sortOrder = sortOrder;
	}

	@Override
	public int getPageNum() {
		return pageNum;
	}
	
	@Override
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	
	@Override
	public int getPageSize() {
		return pageSize;
	}
	
	@Override
	public void setPageSize(int pageSize) {
		if (pageSize == 0) { return; } // that makes no sense. 
		this.pageSize = pageSize;
	}
	
	public static ReportSearchQuery withText(String text, int pageNum, int pageSize) {
		ReportSearchQuery query = new ReportSearchQuery();
		query.setText(text);
		query.setPageNum(pageNum);
		query.setPageSize(pageSize);
		return query;
	}
	
}
