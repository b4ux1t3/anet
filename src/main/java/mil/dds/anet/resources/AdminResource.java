package mil.dds.anet.resources;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import mil.dds.anet.AnetObjectEngine;
import mil.dds.anet.beans.AdminSetting;
import mil.dds.anet.database.AdminDao;
import mil.dds.anet.graphql.GraphQLFetcher;
import mil.dds.anet.graphql.IGraphQLResource;
import mil.dds.anet.views.AbstractAnetBean;

@Path("/api/admin")
@PermitAll
public class AdminResource implements IGraphQLResource {

	private AdminDao dao;
	
	public AdminResource(AnetObjectEngine engine) { 
		this.dao = engine.getAdminDao();
	}
	
	@GET
	@GraphQLFetcher
	@Path("/")
	public List<AdminSetting> getAll() { 
		return dao.getAllSettings();
	}
	
	@POST
	@Path("/save")
	@RolesAllowed("ADMINISTRATOR")
	public Response save(List<AdminSetting> settings) {
		for (AdminSetting setting : settings) {
			dao.saveSetting(setting);
		}

		return Response.ok().build();
	}

	@Override
	public String getDescription() {
		return "Admin Resources";
	}
	
	@Override
	public Class<? extends AbstractAnetBean> getBeanClass() {
		return AdminSetting.class;
	}
	
	@Override
	@SuppressWarnings("rawtypes")
	public Class<List> getBeanListClass() {
		return List.class;
	}
	
	
}
