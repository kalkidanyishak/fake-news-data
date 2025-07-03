import { deleteClaim } from "@/actions/news_claims";
import Link from "next/link";
import React from "react";
import CreateEvidenceForm from "./evidence-form";
import { Input } from "@/components/ui/input";
import {
  Badge,
  BrainCircuit,
  Edit,
  Info,
  Plus,
  PlusIcon,
  PlusSquare,
  Trash2,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AiAnalysis from "./ai-analysis";

type Article = {
  id: string;
  title: string;
  summary: string;
  category: string;
  why: string;
  status: string;
  user_id?: string;
};

type ArticleCardProps = {
  article: Article;
  userId?: string;
  adminMode?: boolean;
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  userId = "",
  adminMode = false,
}) => (
  <Card className="w-full max-w-[400px] m-2">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
        <span
          className={`inline-block px-2 py-1 text-xs rounded ${
            article.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {article.status}
        </span>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          Summary
        </h3>
        <p>{article.summary}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          Reason
        </h3>
        <p>{article.why}</p>
      </div>

      <div>
        <p className="py-1 px-2 rounded-full text-xs border inline-block">
          #{article.category}
        </p>
      </div>
      <AiAnalysis data={JSON.stringify(article)} />
    </CardContent>
    <CardFooter className="flex justify-between border-t pt-4">
      <div className="flex flex-wrap gap-3 mb-4">
        {userId == article?.user_id && article.status == "pending" && (
          <Link href={`/claims/submit-claim/${article.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
        )}
        {userId == article?.user_id && article.status == "pending" && (
          <Button
            onClick={() => deleteClaim(article.id)}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}

        <Link href={`/claims/${article.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Info className="h-4 w-4" />
            View Details
          </Button>
        </Link>
      </div>

      <div key={Date.now()} id="adminMode">
        {adminMode && (
          <div className="relative">
            <Input
              type="checkbox"
              id={`dropdown-toggle-${article.id}`}
              className="peer hidden"
            />

            <div className="flex items-center ml-2 gap-3 mb-4">
              <label
                htmlFor={`dropdown-toggle-${article.id}`}
                className="flex text-[12px] font-semibold py-1.5 px-2 border rounded-md justify-center items-center "
              >
                <Plus className="h-4 w-4" />
                Add Evidence
              </label>

              <Link href={`/admin/${article.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit Details
                </Button>
              </Link>
            </div>

            <div className="fixed inset-0 z-50 opacity-0 max-h-0 peer-checked:opacity-100 peer-checked:backdrop-brightness-50 peer-checked:max-h-screen transition-all overflow-hidden">
              <div className="w-full h-screen flex justify-center items-center px-4">
                <div className="bg-white border shadow-xl rounded-xl p-6 max-w-lg w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">{article.title}</h2>
                    <label
                      htmlFor={`dropdown-toggle-${article.id}`}
                      className="cursor-pointer text-gray-500 hover:text-gray-800"
                    >
                      <X className="w-5 h-5" />
                    </label>
                  </div>
                  <div id="mainContent">
                    <CreateEvidenceForm id={article.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CardFooter>
  </Card>
);

export default ArticleCard;
