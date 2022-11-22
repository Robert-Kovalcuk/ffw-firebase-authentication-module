import "@fastforward-digitisation/ezarchive-portalclient"
import PortalClient from "@chaosinsight/portalclient";

export default class Portal {
	private static readonly defaultSessionParameterName = "sessionGUID"
	private client: PortalClient

	public constructor() {
		this.client = new PortalClient(
			"https://dev-eza.api.ffw.io",
			"v6",
			null, // TODO define error handler
			Portal.defaultSessionParameterName,
			true
		)
	}
}
